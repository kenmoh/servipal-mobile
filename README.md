# Welcome to QuickPickup 👋

### A multi vendor item delivery application

This is a multi-vendor products/items delivery application where users(customer) can list
Products/Items for delivery and users(dispatch riders) will deliver it to the specified destination.
The order(product/items) has pending, delivered and release fund status.Upon delivery of order, the dispatch
mark order as delivered, when the delivery is confirmed by the owner, the owner can release fund by the click of a button.
After a successful order delivery and service charge deduction, fund is released to the vendor wallet. Vendor can request/withdraw funds from their
wallet.

### User Types

        1. Customer(List order(s))
        2. Vendors(Dispatch companies with verified company reg.)
        3. Admin/Staff Users

### Tech Stack

    1. React Native(Expo)
    2. FastAPI(Python web framework)
    3. SQLAlchemy
    4. Alembic(database migration)
    5. PostgreSQL
    6. Docker
    7. Flutterwave(payment gateway)
    8. AWS S3
