USE budget_db; 

INSERT INTO users (email, password) VALUES ('test@gmail.com', 'password'); 

INSERT INTO budgets (business, budgetName, userId) VALUES (true, 'test', 1);

INSERT INTO budgetentries (business, budgetExpenses, amount, name, category, budgetId) VALUES (true, true, 40.0, 'TEST', 'TEST', 1);

INSERT INTO categories (business, categoryName, subcategoryName, userId) VALUES (true,'TEST', 'TEST', 1);