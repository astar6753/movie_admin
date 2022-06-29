package com.greenart.movie_admin.data.movie.request;

import lombok.Data;

@Data
public class MovieTrailerRequest {
    private Integer order;
    private String file;
    private String ext;
    private Long fileSize;
    private String originFileName;
}
