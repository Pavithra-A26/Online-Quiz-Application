package com.example.backend.controller;


import com.example.backend.model.Question;
import com.example.backend.model.Result;
import com.example.backend.model.User;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.repository.ResultRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class QuizController {
    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ResultRepository resultRepo;

    @GetMapping("/questions")
    public List<Question> getQuestions(){
        return  questionRepo.findAll();
    }

    @PostMapping("/questions")
    public Question addQuestion(@RequestBody Question q){
        return  questionRepo.save(q);
    }

    @PostMapping("/register")
    public User register(@RequestBody User user){
        return userRepo.save(user);
    }

    @PostMapping("/submit")
    public Result submitResult(@RequestBody Result result){
        return resultRepo.save(result);
    }

    @GetMapping("/results")
        public List<Result> getResults(){
            return resultRepo.findAll();
    }

    @GetMapping("/questions/{module}")
    public List<Question> getQuestionsByModule(@PathVariable String module) {
        return questionRepo.findByTestModule(module);
    }
}
