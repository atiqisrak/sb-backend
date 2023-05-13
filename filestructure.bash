server/
  config/
    db.js          # Database configuration file
    passport.js    # Passport authentication configuration file
  controllers/
    authController.js   # Controller for authentication related logic
    shopController.js   # Controller for shop related logic
    productController.js # Controller for product related logic
    categoryController.js # Controller for category related logic
  middleware/
    authMiddleware.js   # Middleware for authentication and authorization
  models/
    User.js        # User model
    Shop.js        # Shop model
    Product.js     # Product model
    Category.js    # Category model
  routes/
    authRoutes.js   # Authentication related routes
    shopRoutes.js   # Shop related routes
    productRoutes.js # Product related routes
    categoryRoutes.js # Category related routes
  server.js         # Main server file
