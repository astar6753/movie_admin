package com.greenart.movie_admin.data.actor;

import lombok.Data;

@Data
public class ActorRoleInfoVO {
    private Integer maci_seq;
    private Integer maci_cai_seq;
    private Integer maci_mi_seq;
    private String maci_casting_name;
    private Integer maci_role;
    private String cai_name;
    private String cai_country;
    private String cap_file_name;
}
