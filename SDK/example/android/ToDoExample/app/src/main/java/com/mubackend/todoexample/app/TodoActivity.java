package com.mubackend.todoexample.app;

import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ListView;
import android.widget.TextView;

import com.mubackend.musdk.customobject.MUCustomObject;
import com.mubackend.musdk.munetworkmanager.MUNetworkManager;
import com.mubackend.musdk.munetworkmanager.MUResponse;
import com.mubackend.todoexample.app.todo.Todo;
import com.mubackend.todoexample.app.todo.adapter.TodoAdapter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class TodoActivity extends ActionBarActivity {

    private List<Todo> todos = new ArrayList<Todo>();
    private TodoAdapter todoAdapter;
    private Todo cItem;

    private static String userId = "";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_todo);

        Bundle extras = getIntent().getExtras();
        if(extras != null){
            userId = (String) extras.get("userId");
        }

        getTodos();

        ListView lvMain = (ListView) findViewById(R.id.list);


        todoAdapter = new TodoAdapter(this, todos);

        lvMain.setAdapter(todoAdapter);

        registerForContextMenu(lvMain);

    }

    private void getTodos(){

        Map<String, String> query = new HashMap<String, String>();

        query.put("userid",userId);
        MUNetworkManager.getObjectsQuery("todo", query, new MUResponse(){
            @Override
            public void onSuccess(List<MUCustomObject> muCustomObjects) {
                Log.e("Response Todos", muCustomObjects.toString());

                for(MUCustomObject item: muCustomObjects){
                    Todo todo = new Todo();

                    todo.setId(item.getId());
                    todo.setDescription(item.get("description"));
                    todo.setUserId(userId);
                    todo.setDate(item.getDateCreate());
                    todo.setTitle(item.get("title"));

                    todos.add(todo);
                }

                todoAdapter.updateCollection(todos);

                todoAdapter.notifyDataSetChanged();
            }
        });
    }
}
