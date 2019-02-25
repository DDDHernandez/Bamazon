# Bamazon
Bamazon is an application with an Amazon-like storefront that can processes order requests using MySQL that has Bamazon's product information. As customers place orders bamazon checks to see if the item selected has enough in stock to fulfill customers order. If bamazon does have enough in stock to sell then bamazon will sell item, show price of amount purchased, and decrease quantity. If bamazon doesn't have enough then the customer will be asked to try again or choose a different amount/item.

How to Use Bamazon:
1) Clone the repository:

2) Install the following node packages 'inquirer' and 'mysql'

3) You will need to create a database in MYSQL with bamazon being your database name

4) Then create a table called products inside the database

5) The Table should have the following 

                                              CREATE TABLE products (
                                              -- Unique id for each product --
                                                item_id INT(11) AUTO_INCREMENT NOT NULL,
                                                -- Name of product --
                                              product_name VARCHAR(100) NOT NULL,
                                                -- Department name --
                                              department_name VARCHAR(100) NOT NULL,
                                                -- Cost to customer --
                                              price DECIMAL(10,2) NOT NULL,
                                                -- How much of the product is available in stores. --
                                              stock_quantity INT(11) NOT NULL,
                                                -- Make item_id the primary key --
                                                product_sales DECIMAL (10,2) NOT NULL,
                                              PRIMARY KEY (item_id)
                                            );
6)  Create some products to be stored in the products table

                  INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("MacPro", "Electronic", 2000, 20);

7) Run node in terminal to see storefront

8) Then answer which item you want to buy and how much
9) Bamazon should show you a charge and update stores inventory
10) If customer order to much of one item then customer will be rejected
11) When bamazon is ran again there should be an update with the item(s) purchased
