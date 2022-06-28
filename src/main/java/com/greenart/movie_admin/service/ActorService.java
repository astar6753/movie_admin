package com.greenart.movie_admin.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.greenart.movie_admin.data.actor.ActorCountryVO;
import com.greenart.movie_admin.data.actor.CinemaActorListVO;
import com.greenart.movie_admin.mapper.ActorMapper;

@Service
public class ActorService {
    @Autowired ActorMapper actor_mapper;
    public List<String> makePagerURL(String keyword, String country) {
        Integer pageCnt = actor_mapper.selectActorListPageCount(keyword, country);
        List<String> pagerURL = new ArrayList<String>();
        for(int i=0; i<pageCnt; i++){
            String url = "/actor/list?page="+(i+1);
            if(keyword != null && !keyword.equals("")) url += "&keyword="+keyword;
            if(country != null) url += "&country="+country;
            pagerURL.add(url);
        }
        return pagerURL;
    }
    public List<ActorCountryVO> makeActorCountryLink(String keyword) {
        List<ActorCountryVO> countryLinkList = new ArrayList<ActorCountryVO>();
        List<String> countryList =  actor_mapper.selectActorCountryList();
        for(int i=0; i<countryList.size(); i++){
            String url = "/actor/list?country="+countryList.get(i);
            if(keyword != null && !keyword.equals("")) url += "&keyword="+keyword;
            ActorCountryVO data = new ActorCountryVO();
            data.setUrl(url);
            data.setCountry(countryList.get(i));
            countryLinkList.add(data);
        }
        return countryLinkList;
    }
    public List<CinemaActorListVO> getCinemaActorList(String keyword, String country, Integer page) {
        List<CinemaActorListVO> list = actor_mapper.selectCinemaActorList(keyword, country, (page-1)*10);
        for(int i=0; i<list.size(); i++){
            if(list.get(i).getPhoto() == null) {
                list.get(i).setPhoto("default.jpg");
            }
        }
        return list;
    }
}
