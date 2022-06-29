package com.greenart.movie_admin.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.greenart.movie_admin.data.movie.MovieInfoVO;
import com.greenart.movie_admin.data.movie.request.MovieAddRequest;
import com.greenart.movie_admin.data.movie.request.MovieDescRequest;
import com.greenart.movie_admin.mapper.MovieMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.LinkedHashMap;
import java.util.Map;



@RestController
@RequestMapping("/api/movie")
public class MovieAPIController {
    @Autowired MovieMapper movie_mapper;
    
    @PutMapping("/genre")
    public Map<String,Object> putGenre(@RequestParam String name) {
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

    @PutMapping("/add")
    @Transactional
    public Map<String,Object> putMovieInfo(@RequestBody MovieAddRequest data) {
        Map<String,Object> m = new LinkedHashMap<String,Object>();

        MovieInfoVO movie_info = data.getMovie_info();

        /* UK걸고 try~catch 달았음 */
        try {
            movie_mapper.insertMovieInfo(movie_info);
        } catch (DuplicateKeyException e) {
            m.put("status", false); 
            m.put("message", movie_info.getMi_title()+"은(는) 이미 등록되어있습니다.");
            return m;
        }
        
        // movie_mapper.insertMovieInfo(movie_info);
        movie_mapper.insertMovieImage(data.getMovie_imgs(), movie_info.getMi_seq());
        movie_mapper.insertMovieTrailerVideo(data.getMovie_trailer_list(), movie_info.getMi_seq());
        
        for(MovieDescRequest vo : data.getMovie_desc_list()){
            if(vo.getType().equals("img")) {
                movie_mapper.insertMovieStoryImg(movie_info.getMi_seq(), vo.getContent(), vo.getOrder());
            }
            if(vo.getType().equals("text")) {
                movie_mapper.insertMovieStoryText(movie_info.getMi_seq(), vo.getContent(), vo.getOrder());
            }
        }

        // System.out.println(data.getMovie_info());
        // for(String s : data.getMovie_imgs()){System.out.println(s);}
        // for(MovieDescRequest vo : data.getMovie_desc_list()){System.out.println(vo);}
        // for(MovieTrailerRequest vo : data.getMovie_trailer_list()){System.out.println(vo);}
        return m;
    }


}

