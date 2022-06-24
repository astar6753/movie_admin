package com.greenart.movie_admin.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.greenart.movie_admin.mapper.MovieMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.LinkedHashMap;
import java.util.Map;



@RestController
@RequestMapping("/api/movie")
public class MovieAPIController {
    @Autowired MovieMapper movie_mapper;
    @PutMapping("/genre")
    public Map<String,Object> putMethodName(@RequestParam String name) {
        Map<String,Object> m = new LinkedHashMap<String,Object>();
        try {
            movie_mapper.insertGenre(name);
        } catch (DuplicateKeyException e) {
            m.put("status", false); 
            m.put("message", name+"은(는) 이미 등록되어있습니다.");
            return m;
        }
        m.put("status", true); 
        m.put("message", "장르 정보를 추가하였습니다.");
        return m;
    }
    @GetMapping("/genre/name")
    public Map<String,Object> getGenreInfo(@RequestParam Integer seq) {
        Map<String,Object> m = new LinkedHashMap<String,Object>();
        m.put("name", movie_mapper.getGenreBySeq(seq).getGenre_name());
        return m;
    }
    @PatchMapping("/genre")
    public Map<String,Object> patchGenreInfo(@RequestParam Integer seq, @RequestParam String name) {
        Map<String,Object> m = new LinkedHashMap<String,Object>();
        try {
            movie_mapper.updateGenreName(seq,name);
        } catch (DuplicateKeyException e) {
            m.put("status", false); 
            m.put("message", name+"은(는) 이미 등록되어있습니다.");
            return m;
        }
        m.put("message", "장르 명이 변경되었습니다.");  
        return m;
    }
    @DeleteMapping("/genre")
    public Map<String,Object> deleteGenreInfo(@RequestParam Integer seq) {
        Map<String,Object> m = new LinkedHashMap<String,Object>();
        movie_mapper.deleteGenreInfo(seq);
        m.put("message", "장르 정보가 삭제되었습니다.");        
        return m;
    }
}

