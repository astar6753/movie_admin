package com.greenart.movie_admin.data.movie;

import lombok.Data;

@Data
public class GenreInfoVO {
    private Integer genre_seq;
    private String genre_name;

    //추가정보 MoviInfo table에서 장르별 영화 수
    private Integer genre_count;
}
