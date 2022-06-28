package com.greenart.movie_admin.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.greenart.movie_admin.service.ActorService;


@Controller
@RequestMapping("/actor")
public class ActorController {
    @Autowired ActorService actor_servie;
    // @Autowired ActorMapper actor_mapper;
    @GetMapping("/list")
    public String getActorList(
        @RequestParam @Nullable String keyword,
        @RequestParam @Nullable Integer page,
        @RequestParam @Nullable String country, Model model
    ) {
        if(page==null) page=1;
        
        model.addAttribute("countryURL",actor_servie.makeActorCountryLink(keyword));
        model.addAttribute("pagerURL",actor_servie.makePagerURL(keyword, country));
        model.addAttribute("keyword",keyword);
        model.addAttribute("page",page);
        model.addAttribute("country", country);
        model.addAttribute("list", actor_servie.getCinemaActorList(keyword, country, page));

        return "/actor/list";
    }
}

