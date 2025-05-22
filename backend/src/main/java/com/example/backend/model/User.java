package com.example.backend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private  String username;
    private String password;
    private String role;

    public User(){

    }

    public User(Long id,String username,String password,String role){
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public Long getid(){
        return id;
    }

    public void setid(Long id){
        this.id = id;
    }
    public String getusername(){
        return username;
    }

    public void setusername(String name){
        this.username = name;
    }

    public String getpassword(){
        return  password;
    }

    public void setpassword(String pass){
        this.password = pass;
    }

    public String getrole(){
        return role;
    }

    public void setrole(String role){
        this.role = role;
    }
}
