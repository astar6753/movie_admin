package com.greenart.movie_admin.data.movie.request;

import lombok.Data;

@Data
public class MovieDescRequest {
    private String type;
    private String content;
    private Integer order;
}
