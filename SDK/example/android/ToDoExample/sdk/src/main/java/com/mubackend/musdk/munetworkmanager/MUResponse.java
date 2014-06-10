package com.mubackend.musdk.munetworkmanager;

import com.mubackend.musdk.customobject.MUCustomObject;

import java.util.List;

/**
 * Created by Farmatholin on 10.06.2014.
 */
public class MUResponse {
    public void onSuccess(MUCustomObject muCustomObject){};
    public void onSuccess(List<MUCustomObject> muCustomObject){};
    public void onFailure(Exception e){};
}
