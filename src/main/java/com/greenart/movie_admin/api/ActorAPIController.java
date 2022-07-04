package com.greenart.movie_admin.api;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.greenart.movie_admin.data.actor.ActorInsertVO;
import com.greenart.movie_admin.data.actor.CinemaActorInfoVO;
import com.greenart.movie_admin.data.actor.CinemaActorPhotoVO;
import com.greenart.movie_admin.data.movie.MovieActorCastingVO;
import com.greenart.movie_admin.mapper.ActorMapper;
import com.greenart.movie_admin.service.ActorService;

@RestController
@RequestMapping("/api/actor")
public class ActorAPIController {
    @Autowired ActorMapper actor_mapper;
    @Autowired ActorService actor_service;
    
    @PutMapping("/add")
    @Transactional
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

    @GetMapping("/actor_role")
    public Map<String,Object> getActorRole(Integer seq) {
        Map<String,Object> resultMap = new LinkedHashMap<String, Object>();

        resultMap.put("status",true);
        resultMap.put("list",actor_mapper.selectActorRoleInfo(seq));
        return resultMap;
    }

    @GetMapping("/actor_list")
    public Map<String,Object> getActorList(@RequestParam String keyword, @RequestParam @Nullable Integer page) {
        Map<String,Object> resultMap = new LinkedHashMap<String, Object>();
        if(page==null) page=1;

        resultMap.put("list",actor_service.getCinemaActorList(keyword, null, page));
        resultMap.put("pageCount",actor_mapper.selectActorListPageCount(keyword, null));
        return resultMap;
    }

    @PutMapping("/actor_role/add")
    public Map<String,Object> getActorRoleInfo(@RequestBody MovieActorCastingVO data) {
        Map<String,Object> resultMap = new LinkedHashMap<String, Object>();
        actor_mapper.insertActorRoleInfo(data);
        resultMap.put("status",true);
        resultMap.put("message","배역 정보를 추가하였습니다.");
        return resultMap;
    }

    @DeleteMapping("/actor_role")
    public Map<String,Object> deleteActorRoleInfo(@RequestParam Integer seq) {
        Map<String,Object> resultMap = new LinkedHashMap<String, Object>();
        actor_mapper.deleteActorRoleInfoBySeq(seq);
        resultMap.put("status",true);
        resultMap.put("message","배우/배역 정보가 삭제되었습니다.");
        return resultMap;
    }

    @PatchMapping("/actor_role")
    public Map<String,Object> updateActorRoleInfo(@RequestBody MovieActorCastingVO data) {
        Map<String,Object> resultMap = new LinkedHashMap<String, Object>();
        actor_mapper.updateActorRoleInfo(data);
        resultMap.put("status",true);
        resultMap.put("message","배우/배역 정보가 수정되었습니다.");
        return resultMap;
    }
}

