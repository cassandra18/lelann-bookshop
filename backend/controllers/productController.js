const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Add a new product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      condition = "NEW",
      description,
      author_id,
      publisher_id,
      subcategory_id,
      subject,
      featured = false,
      company,
      wishlist = false,
      promotion = false,
      bestseller = false,
      newarrival = false,
      oldPrice,
    } = req.body;

    // Validate required fields
    if (!name || !price || !subcategory_id) {
      return res.status(400).json({
        message: "Name, price, and subcategory_id are required fields",
      });
    }
    // Check if image file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }
    // Convert price to float
    const priceFloat = parseFloat(price);
    if (isNaN(priceFloat)) {
      return res.status(400).json({ message: "Price must be a valid number" });
    }
    // Convert oldPrice and discount to float if provided
    let oldPriceFloat;
    if (oldPrice) {
      oldPriceFloat = parseFloat(oldPrice);
      if (isNaN(oldPriceFloat)) {
        return res
          .status(400)
          .json({ message: "oldPrice must be a valid number" });
      }
    }
    // Construct image URL
    const image = `http://localhost:5000/uploads/${req.file.filename}`;

    const existing = await prisma.product.findUnique({
      where: { name: req.body.name },
    });

    if (existing) {
      return res.status(400).json({ message: "Product name already exists" });
    }
    const subcategory = await prisma.subcategory.findUnique({
      where: { id: subcategory_id },
      select: { id: true, category_id: true },
    });

    if (!subcategory) {
      return res.status(400).json({ message: "Invalid subcategory_id" });
    }

    if (!subcategory.category_id) {
      return res
        .status(400)
        .json({ message: "Subcategory does not have a category assigned" });
    }

    // Create product data object
    const productData = {
      name,
      price: priceFloat,
      condition,
      subject,
      featured: featured === "true", // Convert to boolean
      company,
      subcategory: { connect: { id: subcategory_id } },
      image,
      description,
      oldPrice: oldPriceFloat,
      promotion: promotion === "true",
      bestseller: bestseller === "true",
      newarrival: newarrival === "true",
      wishlist: wishlist === "true",
    };

    // Conditionally add author and publisher if IDs are provided
    if (author_id) {
      productData.author = { connect: { id: author_id } };
    }

    if (publisher_id) {
      productData.publisher = { connect: { id: publisher_id } };
    }

    // Create a new product
    const product = await prisma.product.create({ data: productData });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all products with optional filters
const getProducts = async (req, res) => {
  try {
    const {
      featured,
      bestseller,
      promotion,
      newarrival,
      wishlist,
      category_id,
      subcategory_id,
      author_id,
      publisher_id,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Normalize into arrays if multiple provided
    const subcategoryIds = Array.isArray(subcategory_id)
      ? subcategory_id
      : subcategory_id
      ? [subcategory_id]
      : [];

    const authorIds = Array.isArray(author_id)
      ? author_id
      : author_id
      ? [author_id]
      : [];

    const publisherIds = Array.isArray(publisher_id)
      ? publisher_id
      : publisher_id
      ? [publisher_id]
      : [];

    // Build where condition
    const whereCondition = {
      ...(featured === "true" && { featured: true }),
      ...(bestseller === "true" && { bestseller: true }),
      ...(promotion === "true" && { promotion: true }),
      ...(newarrival === "true" && { newarrival: true }),
      ...(wishlist === "true" && { wishlist: true }),

      ...(category_id && {
        subcategory: {
          category_id,
          ...(subcategoryIds.length > 0 && { id: { in: subcategoryIds } }),
        },
      }),

      // If only subcategories without category_id
      ...(!category_id &&
        subcategoryIds.length > 0 && {
          subcategory: { id: { in: subcategoryIds } },
        }),

      ...(authorIds.length > 0 && { author_id: { in: authorIds } }),
      ...(publisherIds.length > 0 && { publisher_id: { in: publisherIds } }),

      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [products, totalProducts] = await Promise.all([
      prisma.product.findMany({
        where: whereCondition,
        skip,
        take,
        include: {
          author: true,
          publisher: true,
          subcategory: { include: { category: true } },
        },
      }),
      prisma.product.count({ where: whereCondition }),
    ]);

    res.status(200).json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / take),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Get a product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        author: true,
        publisher: true,
        subcategory: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      condition,
      description,
      authorId,
      publisher_id,
      subcategory_id,
      subject,
      featured,
      company,
      cta,
      promotion,
      bestseller,
      newarrival,
      wishlist,
      oldPrice,
    } = req.body;

    // Check if the product exists
    const existingProduct = await prisma.product.findUnique({ where: { id } });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Prepare the product data object for update
    const productData = {
      name,
      price: price !== undefined ? parseFloat(price) : existingProduct.price,
      condition,
      description,
      subject,
      featured:
        featured !== undefined ? featured === "true" : existingProduct.featured,
      company,
      subcategory: subcategory_id
        ? { connect: { id: subcategory_id } }
        : existingProduct.subcategory,
      image: req.file
        ? `https://lelann-bookshop.onrender.com/uploads/${req.file.filename}`
        : existingProduct.image,
      cta,
      oldPrice:
        oldPrice !== undefined
          ? parseFloat(oldPrice)
          : existingProduct.oldPrice,
      promotion:
        promotion !== undefined
          ? promotion === "true"
          : existingProduct.promotion,
      bestseller:
        bestseller !== undefined
          ? bestseller === "true"
          : existingProduct.bestseller,
      newarrival:
        newarrival !== undefined
          ? newarrival === "true"
          : existingProduct.newarrival,
      wishlist:
        wishlist !== undefined ? wishlist === "true" : existingProduct.wishlist,
    };

    // Conditionally add author and publisher if IDs are provided
    if (authorId) {
      productData.author = { connect: { id: authorId } };
    }

    if (publisher_id) {
      productData.publisher = { connect: { id: publisher_id } };
    }

    // Update the product
    const product = await prisma.product.update({
      where: { id },
      data: productData,
    });

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the product exists
    const existingProduct = await prisma.product.findUnique({ where: { id } });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    await prisma.product.delete({ where: { id } });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
