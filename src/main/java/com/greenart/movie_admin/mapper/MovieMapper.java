package com.greenart.movie_admin.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.greenart.movie_admin.data.movie.GenreInfoVO;
import com.greenart.movie_admin.data.movie.MovieInfoVO;
import com.greenart.movie_admin.data.movie.request.MovieTrailerRequest;

@Mapper
public interface MovieMapper {
    public void insertGenre(String name);
    public List<GenreInfoVO> getGenreList(Integer offset);
    public Integer getGenrePageCnt();
    public GenreInfoVO getGenreBySeq(Integer seq);
    public void updateGenreName(Integer seq, String name);
    public void deleteGenreInfo(Integer seq);
    
    public void insertMovieInfo(MovieInfoVO data);
    public void insertMovieImage(List<String> list, Integer seq);
    public void insertMovieStoryImg(Integer seq, String content, Integer order);
    public void insertMovieStoryText(Integer seq, String content, Integer order);
    public void insertMovieTrailerVideo(List<MovieTrailerRequest> list, Integer seq);

    public List<MovieInfoVO> selectMovieList(String keyword, Integer offset, String country);
    public Integer selectMoviePageCnt(String keyword, String country);

}
