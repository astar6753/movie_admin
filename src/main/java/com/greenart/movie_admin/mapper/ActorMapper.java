package com.greenart.movie_admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.greenart.movie_admin.data.actor.CinemaActorInfoVO;
import com.greenart.movie_admin.data.actor.CinemaActorListVO;
import com.greenart.movie_admin.data.actor.CinemaActorPhotoVO;

@Mapper
public interface ActorMapper {

    public Integer selectActorListPageCount (String keyword, String country);
    public List<CinemaActorListVO> selectCinemaActorList(String keyword, String country, Integer offset);
    public List<String> selectActorCountryList();
    public void insertActorInfo(CinemaActorInfoVO data);
    public void insertActorImages(List<CinemaActorPhotoVO> list);
}
