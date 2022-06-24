package com.greenart.movie_admin.data.movie;

import lombok.Data;

@Data
public class MovieLikeDislikeVO {
    private Integer mld_seq;
    private Integer mld_ai_seq;
    private Integer mld_mi_seq;
    private Integer mld_like_dislike;
}
