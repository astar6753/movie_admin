package com.greenart.movie_admin.data.movie;

import lombok.Data;

@Data
public class MovieDescriptionVO {
    private Integer seq;
    private Integer mi_seq;
    private Integer n_order;
    private String content;
    private String type;
}
