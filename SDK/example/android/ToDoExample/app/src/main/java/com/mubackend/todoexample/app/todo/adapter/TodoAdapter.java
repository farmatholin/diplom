package com.mubackend.todoexample.app.todo.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.mubackend.todoexample.app.R;
import com.mubackend.todoexample.app.todo.Todo;

import java.util.List;

/**
 * Created by Farmatholin on 11.06.2014.
 */
public class TodoAdapter extends BaseAdapter {

    Context ctx;
    LayoutInflater lInflater;
    List<Todo> objects;

    public TodoAdapter(Context context, List<Todo> products) {
        ctx = context;
        objects = products;
        lInflater = (LayoutInflater) ctx
                .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    }

    public void updateCollection(List<Todo> newNotes){
        objects = newNotes;
    }
    // кол-во элементов
    @Override
    public int getCount() {
        return objects.size();
    }

    // элемент по позиции
    @Override
    public Object getItem(int position) {
        return objects.get(position);
    }

    // id по позиции
    @Override
    public long getItemId(int position) {
        return position;
    }

    // пункт списка
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // используем созданные, но не используемые view
        View view = convertView;
        if (view == null) {
            view = lInflater.inflate(R.layout.todo_item, parent, false);
        }

        Todo todo = getTodo(position);

        ((TextView) view.findViewById(R.id.TodoTitle)).setText(todo.getTitle());
        ((TextView) view.findViewById(R.id.TodoDescription)).setText(todo.getDescription());

        return view;
    }

    // товар по позиции
    Todo getTodo(int position) {
        return ((Todo) getItem(position));
    }

}