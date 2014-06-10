package com.mubackend.musdk.customobject;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Farmatholin on 09.06.2014.
 */
public class MUCustomObject {

    /**
     * id обьекта генерится сервером
     */
    private String id;

    /**
     * дата создания в формате UTC
     */
    private String dateCreate;

    /**
     * дата редактирования в формате UTC
     */
    private String dateUpdated;

    public String getCollectionName() {
        return collectionName;
    }

    /**
     * К какой коллекции относится объект
     */
    private String collectionName;

    public void setData(Map<String, String> data) {
        this.data = data;
    }

    /**
     * Тут хранится в формате ключ значение данные обьекта
     */
    private Map<String, String> data = new HashMap<String, String>();


    public MUCustomObject(String collectionName) {
        this.collectionName = collectionName;
    }

    public void put(String key, String value){
        data.put(key, value);
    }

    public String get(String key){
        return data.get(key);
    }

    public String getId() {
        return id;
    }

    public String getDateCreate() {
        return dateCreate;
    }

    public String getDateUpdated() {
        return dateUpdated;
    }

    @Override
    public String toString() {
        return "MUCustomObject{" +
                "id='" + id + '\'' +
                ", dateCreate='" + dateCreate + '\'' +
                ", dateUpdated='" + dateUpdated + '\'' +
                ", data=" + data +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MUCustomObject that = (MUCustomObject) o;

        if (dateCreate != null ? !dateCreate.equals(that.dateCreate) : that.dateCreate != null)
            return false;
        if (id != null ? !id.equals(that.id) : that.id != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (dateCreate != null ? dateCreate.hashCode() : 0);
        return result;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setDateCreate(String dateCreate) {
        this.dateCreate = dateCreate;
    }

    public void setDateUpdated(String dateUpdated) {
        this.dateUpdated = dateUpdated;
    }

    public Map<String, String> getData() {
        return data;
    }
}
