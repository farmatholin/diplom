package com.mubackend.musdk.munetworkmanager;

import android.util.Log;

import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.JsonHttpResponseHandler;
import com.loopj.android.http.RequestParams;
import com.mubackend.musdk.customobject.MUCustomObject;

import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Created by Farmatholin on 09.06.2014.
 */
public class MUNetworkManager {
    public static  String API_KEY = "";
    public static final String BASE_URL = "http://10.0.2.2:8082/data/";
    private static AsyncHttpClient client = new AsyncHttpClient();
    public static void setAPI_KEY(String apiKey){
        API_KEY = apiKey;
        //if (android.os.Build.VERSION.SDK_INT > 9) {
           // StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
           // StrictMode.setThreadPolicy(policy);
        //}
    }

    private static String getAbsoluteUrl(String relativeUrl) {
        return BASE_URL + relativeUrl;
    }

    public static void sendObject(final MUCustomObject object, final MUResponse muResponse){

        client.addHeader("api-key", API_KEY);

        RequestParams params = new RequestParams(object.getData());
        client.post(getAbsoluteUrl(object.getCollectionName()), params, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(JSONObject jsonObject) {
                MUCustomObject result = new MUCustomObject(object.getCollectionName());
                try {
                    result.setId(jsonObject.getString("_id"));
                    result.setDateCreate(jsonObject.getString("dateCreate"));
                    result.setDateUpdated(jsonObject.getString("dateUpdated"));
                    result.setData(object.getData());

                    muResponse.onSuccess(result);
                } catch (JSONException e1) {
                    e1.printStackTrace();
                }

            }
        });
    }


    public static void getObjects(final String collectionName, final MUResponse response){

        client.addHeader("api-key", API_KEY);

        client.get(getAbsoluteUrl(collectionName), null, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(JSONArray jsonArray) {
                List<MUCustomObject> result = new ArrayList<MUCustomObject>();
                try {
                    for (int i = 0; i < jsonArray.length(); ++i) {
                        JSONObject jsonObject = jsonArray.getJSONObject(i);

                        MUCustomObject muCustomObject = new MUCustomObject(collectionName);
                        Iterator<?> keys = jsonObject.keys();

                        while (keys.hasNext()) {
                            String key = (String) keys.next();
                            String value = jsonObject.getString(key);
                            if (key.equals("_id")) {
                                muCustomObject.setId(value);
                            } else if (key.equals("dateUpdated")) {
                                muCustomObject.setDateUpdated(value);
                            } else if (key.equals("dateCreate")) {
                                muCustomObject.setDateCreate(value);
                            } else {
                                muCustomObject.put(key, value);
                            }
                        }
                        result.add(muCustomObject);
                    }
                    response.onSuccess(result);

                } catch (Exception e) {
                    response.onFailure(e);
                }
            }
        });
    }

    public static void deleteObject(final MUCustomObject object, final MUResponse muResponse){

        client.addHeader("api-key", API_KEY);

        client.delete(
                getAbsoluteUrl(object.getCollectionName() +
                                "/" +
                                object.getId()
                ), new AsyncHttpResponseHandler() {
                    @Override
                    public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
                        if(statusCode == 200) {
                            muResponse.onSuccess(object);
                        } else {
                            muResponse.onFailure(null);
                        }
                    }
                }
        );
    }

    public static void updateObject(final MUCustomObject object, final MUResponse muResponse){

        client.addHeader("api-key", API_KEY);

        RequestParams params = new RequestParams(object.getData());
        client.put(
                getAbsoluteUrl(
                        object.getCollectionName()
                                + "/"
                                + object.getId()
                ), params, new JsonHttpResponseHandler() {
                    @Override
                    public void onSuccess(JSONObject jsonObject) {
                        MUCustomObject result = new MUCustomObject(object.getCollectionName());
                        try {
                            result.setId(jsonObject.getString("_id"));
                            result.setDateCreate(jsonObject.getString("dateCreate"));
                            result.setDateUpdated(jsonObject.getString("dateUpdated"));
                            result.setData(object.getData());

                            muResponse.onSuccess(result);
                        } catch (JSONException e1) {
                            e1.printStackTrace();
                        }

                    }
                }
        );
    }

    public static void getObject(final String collectionName, String id, final MUResponse muResponse){

        client.addHeader("api-key", API_KEY);

        client.get(getAbsoluteUrl(collectionName + "/" + id), null, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(JSONObject jsonObject) {
                MUCustomObject result = new MUCustomObject(collectionName);
                try {
                    Iterator<?> keys = jsonObject.keys();
                    while (keys.hasNext()) {
                        String key = (String) keys.next();
                        String value = jsonObject.getString(key);
                        if (key.equals("_id")) {
                            result.setId(value);
                        } else if (key.equals("dateUpdated")) {
                            result.setDateUpdated(value);
                        } else if (key.equals("dateCreate")) {
                            result.setDateCreate(value);
                        } else {
                            result.put(key, value);
                        }
                    }
                    muResponse.onSuccess(result);
                } catch (Exception e) {
                    muResponse.onFailure(e);
                }
            }
        });
    }

    public static void getObjectsQuery(final String collectionName, Map<String, String> query, final MUResponse muResponse){
        client.addHeader("api-key", API_KEY);

        StringBuilder stringBuilder = new StringBuilder();
        for (Map.Entry entry: query.entrySet()) {
            stringBuilder.append(
                    (String)entry.getKey()
                            + "="
                            + (String)entry.getValue()
                            + "&"
            );
        }

        client.get(getAbsoluteUrl(collectionName
                + "?"
                +stringBuilder.toString()
        ), null, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(JSONArray jsonArray) {
                List<MUCustomObject> result = new ArrayList<MUCustomObject>();
                try {
                    for (int i = 0; i < jsonArray.length(); ++i) {
                        JSONObject jsonObject = jsonArray.getJSONObject(i);

                        MUCustomObject muCustomObject = new MUCustomObject(collectionName);
                        Iterator<?> keys = jsonObject.keys();

                        while (keys.hasNext()) {
                            String key = (String) keys.next();
                            String value = jsonObject.getString(key);
                            if (key.equals("_id")) {
                                muCustomObject.setId(value);
                            } else if (key.equals("dateUpdated")) {
                                muCustomObject.setDateUpdated(value);
                            } else if (key.equals("dateCreate")) {
                                muCustomObject.setDateCreate(value);
                            } else {
                                muCustomObject.put(key, value);
                            }
                        }
                        result.add(muCustomObject);
                    }
                    muResponse.onSuccess(result);

                } catch (Exception e) {
                    muResponse.onFailure(e);
                }
            }
        });
    }
}
