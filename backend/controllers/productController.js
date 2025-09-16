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
      subcategory_ids,
      subject,
      featured = false,
      company,
      wishlist = false,
      promotion = false,
      bestseller = false,
      newarrival = false,
      oldPrice,
    } = req.body;

        const subcategoryIdsArray = typeof subcategory_ids === 'string'
      ? subcategory_ids.split(',').map(id => id.trim())
      : subcategory_ids;
      
    // Validate required fields
    if (!name || !price || !subcategoryIdsArray || subcategoryIdsArray.length === 0) {
      return res.status(400).json({
        message: "Name, price, and subcategory_ids are required fields",
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
    const subcategories = await prisma.subcategory.findMany({
      where: { id: { in: subcategoryIdsArray } },
      select: { id: true, category_id: true },
    });

    if (!subcategories || subcategories.length === 0) {
      return res.status(400).json({ message: "Invalid subcategory_ids" });
    }

    const allSubcategoriesHaveCategory = subcategories.every(sub => sub.category_id);
    if (!allSubcategoriesHaveCategory) {
      return res
        .status(400)
        .json({ message: "One or more subcategories do not have a category assigned" });
    }

    // Create product data object
    const productData = {
      name,
      price: priceFloat,
      condition,
      subject,
      featured: featured === "true",
      company,
      subcategories: {
        connect: subcategoryIdsArray.map((id) => ({ id })),
      },
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
      subcategory_ids,
      author_id,
      publisher_id,
      search,
      page = 1,
      limit = 40,
      sort,
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Normalize into arrays if multiple provided
    const subcategoryIds = Array.isArray(subcategory_ids)
      ? subcategory_ids
      : subcategory_ids
      ? [subcategory_ids]
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

      ...(category_id || subcategoryIds.length > 0) && {
        subcategories: {
          some: {
            ...(category_id && { category_id }),
            ...(subcategoryIds.length > 0 && { id: { in: subcategoryIds } }),
          },
          },
      },

      ...(authorIds.length > 0 && { author_id: { in: authorIds } }),
      ...(publisherIds.length > 0 && { publisher_id: { in: publisherIds } }),

      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    let orderByCondition = {};
    if (sort === "asc") {
      orderByCondition = { price: 'asc' };
    } else if (sort === "desc") {
      orderByCondition = { price: 'desc' };
    }

    const [products, totalProducts] = await Promise.all([
      prisma.product.findMany({
        where: whereCondition,
        skip,
        take,
        orderBy: orderByCondition,
        include: {
          author: true,
          publisher: true,
          subcategories: { include: { category: true } },
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
        subcategories: {
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
      author_id,
      publisher_id,
      subcategory_ids,
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

    // Check if the product exists and include its current subcategories
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        subcategories: true,
      },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Convert subcategory_ids to an array if it's a comma-separated string
    const subcategoryIdsArray =
      typeof subcategory_ids === "string"
        ? subcategory_ids.split(",").map((id) => id.trim())
        : Array.isArray(subcategory_ids)
        ? subcategory_ids
        : undefined;

    // Prepare the product data object for update
    const productData = {};

    // Conditionally add fields to the update object if they are present in the request body
    if (name !== undefined) productData.name = name;
    if (price !== undefined) productData.price = parseFloat(price);
    if (condition !== undefined) productData.condition = condition;
    if (description !== undefined) productData.description = description;
    if (subject !== undefined) productData.subject = subject;
    if (company !== undefined) productData.company = company;
    if (cta !== undefined) productData.cta = cta;
    if (oldPrice !== undefined) productData.oldPrice = parseFloat(oldPrice);

    // Conditionally add image URL if a new file is uploaded
    if (req.file) {
      productData.image = `https://lelann-bookshop.onrender.com/uploads/${req.file.filename}`;
    }

    // Conditionally update boolean fields, ensuring they are parsed correctly
    if (featured !== undefined) productData.featured = featured === "true";
    if (promotion !== undefined) productData.promotion = promotion === "true";
    if (bestseller !== undefined) productData.bestseller = bestseller === "true";
    if (newarrival !== undefined) productData.newarrival = newarrival === "true";
    if (wishlist !== undefined) productData.wishlist = wishlist === "true";

    // Conditionally update subcategories, handling disconnect and connect
    if (subcategoryIdsArray) {
      const currentSubcategoryIds = existingProduct.subcategories.map(
        (sub) => sub.id
      );
      const subcategoriesToDisconnect = currentSubcategoryIds.filter(
        (id) => !subcategoryIdsArray.includes(id)
      );
      const subcategoriesToConnect = subcategoryIdsArray.filter(
        (id) => !currentSubcategoryIds.includes(id)
      );

      productData.subcategories = {
        disconnect: subcategoriesToDisconnect.map((id) => ({ id })),
        connect: subcategoriesToConnect.map((id) => ({ id })),
      };
    }

    // Conditionally update author and publisher relationships
    if (author_id) {
      productData.author = { connect: { id: author_id } };
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
