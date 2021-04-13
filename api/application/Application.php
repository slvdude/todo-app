<?php
require_once ('DB/DB.php');
require_once ('User/User.php');

class Application {
    function __construct(){
        $db = new DB();
        $this->user = new User($db);
    }

    public function login($params){
        if($params['login'] && $params ['password']) {
            return $this->user->login($params['login'], $params['password']);
        }
    }

    public function registration($params) {
        if($params['name'] && $params['login'] && $params ['password']) {
            return $this->user->registration($params['name'], $params['login'], $params ['password']);
        }
    }

    public function logout($params){
        if($params['token']) {
            return $this->user->logout($params['token']);
        }	
	}  

    public function makeTodo($params) {
		if($params['token'] && $params['text']) {
			$user = $this->user->getUser($params['token']);
			if ($user) {
				$this->user->makeTodo($user['id'], $params['text']);
				return true;
			}
		}
		return false;
	}

    public function deleteTodo($params) {
		if($params['token'] && $params['text']) {
            $this->user->deleteTodo($params['text']);
            //print_r($params['text']);
            return true;
		}
		return false;
	}

    public function getTodos($params) {
		if($params['token']) {
			$user = $this->user->getUser($params['token']);
			if ($user) {
				return $this->user->getTodos($user['id']);
			}
		}
		return false;
	}
}