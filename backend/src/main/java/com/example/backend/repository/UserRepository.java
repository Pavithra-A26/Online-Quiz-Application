package com.example.backend.repository;


import com.example.backend.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface  UserRepository extends JpaRepository<User,Long> {
     User findByUsername(String username);
}
