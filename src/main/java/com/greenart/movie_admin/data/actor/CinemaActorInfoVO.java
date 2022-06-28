package com.greenart.movie_admin.data.actor;

import lombok.Data;

@Data
public class CinemaActorInfoVO {
    private Integer cai_seq;
    private String cai_name;
    private String cai_country;
    
    public CinemaActorInfoVO(){}
    public CinemaActorInfoVO(String cai_name, String cai_country){
        this.cai_name = cai_name;
        this.cai_country = cai_country;
    }
}
