
<?php
class Database {
    // GoDaddy database credentials - UPDATE THESE WITH YOUR ACTUAL CREDENTIALS
    private $host = 'localhost'; // Usually 'localhost' for GoDaddy
    private $db_name = 'your_database_name'; // Your actual database name from cPanel
    private $username = 'your_db_username'; // Your actual database username
    private $password = 'your_db_password'; // Your actual database password
    private $conn;

    public function getConnection() {
        $this->conn = null;
        
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4",
                $this->username,
                $this->password,
                array(
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
                )
            );
            
            error_log("Database connection successful to: " . $this->db_name);
            
        } catch(PDOException $e) {
            error_log("Database connection error: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
            exit;
        }
        
        return $this->conn;
    }
}

// Test connection when this file is included
if (basename($_SERVER['PHP_SELF']) !== 'database.php') {
    try {
        $database = new Database();
        $db = $database->getConnection();
        if ($db) {
            error_log("Database connection test successful");
        }
    } catch(Exception $e) {
        error_log("Database connection test failed: " . $e->getMessage());
    }
}
?>
