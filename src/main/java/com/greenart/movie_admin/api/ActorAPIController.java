package com.greenart.movie_admin.api;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenart.movie_admin.data.actor.ActorInsertVO;
import com.greenart.movie_admin.data.actor.CinemaActorInfoVO;
import com.greenart.movie_admin.data.actor.CinemaActorPhotoVO;
import com.greenart.movie_admin.mapper.ActorMapper;

@RestController
@RequestMapping("/api/actor")
public class ActorAPIController {
    @Autowired ActorMapper actor_mapper;
    @PutMapping("/add")
    public Map<String,Object> putActorInfo(@RequestBody ActorInsertVO data) {
        Map<String,Object> resultMap = new LinkedHashMap<String, Object>();

        CinemaActorInfoVO info = new CinemaActorInfoVO(data.getName(), data.getCountry());
        actor_mapper.insertActorInfo(info);
        List<CinemaActorPhotoVO> photo_list = new ArrayList<CinemaActorPhotoVO>();
        for(String s: data.getImages()) {
            CinemaActorPhotoVO photo = new CinemaActorPhotoVO();
            photo.setCap_cai_seq(info.getCai_seq());
            photo.setCap_file_name(s);
            photo_list.add(photo);
        }
        actor_mapper.insertActorImages(photo_list);
        resultMap.put("info",info);
        resultMap.put("data",data);
        resultMap.put("message","배우정보를 추가했습니다.");

        return resultMap;
    }

}

