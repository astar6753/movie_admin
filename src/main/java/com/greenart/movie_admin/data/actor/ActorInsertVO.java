package com.greenart.movie_admin.data.actor;

import java.util.List;

import lombok.Data;

@Data
public class ActorInsertVO {
    private String name;
    private String country;
    private List<String> images;
}
