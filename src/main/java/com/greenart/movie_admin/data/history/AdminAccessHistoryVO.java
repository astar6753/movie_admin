package com.greenart.movie_admin.data.history;

import java.util.Date;

import lombok.Data;

@Data
public class AdminAccessHistoryVO {
    private Integer aah_seq;
    private Integer aah_aai_seq;
    private String aah_ip;
    private Date aah_start;
    private Date aah_end;
    private String aah_url;
}