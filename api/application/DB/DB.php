<?php

class DB {
    function __construct() {
        $host = "127.0.0.1:3306";
        $user = "root";
        $pass = "root";
        $name = "todo";
        try {
            $this->conn = new PDO("mysql:host=$host;dbname=$name", $user, $pass);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
            die();
        }
    }

    function __destruct() {
        $this->conn = null;
    }

    public function getUserByLogin($login) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE login='$login'");
        $stmt->execute();
        return $stmt->fetch();
    }

    public function getUserByLoginPass($login, $password) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE login='$login' AND password='$password'");
        $stmt->execute();
        return $stmt->fetch();
    }

    public function getUserByToken($token) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE token='$token'");
        $stmt->execute();
        return $stmt->fetch();
    }

    public function updateToken($id, $token) {
        $stmt = $this->conn->prepare("UPDATE users SET token='$token' WHERE id=$id");
        $stmt->execute();
        return true;
    }

    public function addNewUser($name, $login, $password) {
        $stmt = $this->conn->prepare("INSERT INTO `users` (`name`, `login`, `password`) VALUES ('$name', '$login', '$password')");
        $stmt->execute();
    }

    public function makeTodo($id, $text) {
		$stmt = $this->conn->prepare("INSERT INTO notes (`user_id`, `note`) VALUES ('$id', '$text')");
        $stmt->execute();		
	}

    public function deleteTodo($text) {
		$stmt = $this->conn->prepare("DELETE FROM notes WHERE  `note` = '$text'");
        $stmt->execute();		
	}

    public function getTodos($id) {
		$stmt = $this->conn->prepare("SELECT * FROM notes WHERE `user_id`='$id'");
        $stmt->execute();
        return $stmt->fetchAll();		
	}
}