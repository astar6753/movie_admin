package com.greenart.movie_admin.data.movie;

import lombok.Data;

@Data
public class MovieImageVO {
    private Integer mimg_seq;
    private Integer mimg_mi_seq;
    private Integer mimg_order;
    private String mimg_file_name;
    private Integer mimg_is_poster;    
}
