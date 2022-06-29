package com.greenart.movie_admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.greenart.movie_admin.mapper.MovieMapper;

@Controller
@RequestMapping("/movie")
public class MovieController {
    @Autowired MovieMapper movie_mapper;
    @GetMapping("/genre")
    public String getMovieGenre(Model model, @RequestParam @Nullable Integer page) {
        if(page==null) page = 1;
        model.addAttribute("page",page);
        model.addAttribute("genreList",movie_mapper.getGenreList((page-1)*20));
        model.addAttribute("pageCount",movie_mapper.getGenrePageCnt());

        return "/movie/genre";
    }

    @GetMapping("/list")
    public String getMovieList(Model model, @RequestParam @Nullable String keyword, @RequestParam @Nullable Integer page, @RequestParam @Nullable String country) {
        
        model.addAttribute("keyword",keyword);
        model.addAttribute("country",country);
        if(page==null) page = 1;
        model.addAttribute("page",page);

        model.addAttribute("list", movie_mapper.selectMovieList(keyword, (page-1)*10, country));
        model.addAttribute("pageCount", movie_mapper.selectMoviePageCnt(keyword, country));
        
        return "/movie/list";
    }
    @GetMapping("/add")
    public String getMovieAdd(Model model) {
        model.addAttribute("mode", "add");
        model.addAttribute("genreList", movie_mapper.getGenreList(null));

        return "/movie/form";
    }    
    @GetMapping("/detail")
    public String getMovieDetail(Model model, @RequestParam Integer movie_no) {
        model.addAttribute("mode", "modify");
        model.addAttribute("genreList", movie_mapper.getGenreList(null));

        return "/movie/form";
    }
}
