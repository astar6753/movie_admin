package com.greenart.movie_admin.data.account;

import lombok.Data;

@Data
public class AdminAccountInfoVO {
    private Integer aai_seq;
    private String aai_id;
    private String aai_pwd;
    private String aai_name;
    private Integer aai_role;
}
