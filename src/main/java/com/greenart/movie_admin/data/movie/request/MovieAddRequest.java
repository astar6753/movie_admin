package com.greenart.movie_admin.data.movie.request;

import java.util.List;

import com.greenart.movie_admin.data.movie.MovieInfoVO;

import lombok.Data;

@Data
public class MovieAddRequest {
    private MovieInfoVO movie_info;
    private List<String> movie_imgs;
    private List<MovieDescRequest> movie_desc_list;
    private List<MovieTrailerRequest> movie_trailer_list;
}
