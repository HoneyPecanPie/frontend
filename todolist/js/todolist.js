$(function() {
    load();
    // li添加操作
    $("#title").on("keydown", function(event) {
            if (event.keyCode === 13) {
                if ($(this).val() === '') {
                    alert('请输入你要做的任务～')
                } else {
                    // 先读取本地存储的数据
                    var local = getData();
                    // 把数据追加给local数组
                    local.push({ title: $(this).val(), done: false });
                    // 把数组存储给本地存储空间
                    saveData(local);
                    // 将本地存储的数据渲染到页面中
                    load();
                    // 让当前文本框内容清除
                    $(this).val('');
                }
            }
        })
        // li删除操作,删除的是本地存储数据
        // 给每个li自定义属性，标记index
        // 不能用$(this).index()来获取a的索引号，因为这个方法只适用于亲兄弟之间，而每个a的外面都有li
        // 因为a为动态创建，所以用on绑定事件
    $("ol,ul").on("click", "a", function() {
            // 先获得本地存储
            var data = getData();
            // 修改数据
            // 根据索引号删除相关数据--数组splice(从哪个位置删除, 删除几个元素) 方法
            var index = $(this).attr("id");
            data.splice(index, 1);
            // 保存到本地页面
            saveData(data);
            // 重新渲染页面
            load();
        })
        // 正在进行和已完成选项操作
    $("ol,ul").on("click", "input", function() {
        // 先获取本地数据
        var data = getData();
        // 修改数据
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        // 保存到本地存储
        saveData(data);
        // 重新渲染
        load();
    })
});

// 读取本地存储数据
function getData() {
    var data = localStorage.getItem("todolist");
    if (data !== null) {
        return JSON.parse(data);
    } else {
        return [];
    }
}
// 存储本地数据
function saveData(data) {
    localStorage.setItem("todolist", JSON.stringify(data));
}

// 渲染加载数据
function load() {
    var data = getData();
    // 在遍历数据之前，先将ol里面的元素清空，避免重复加载
    $("ol,ul").empty();
    var todocount = 0;
    var donecount = 0;
    // 便历数据
    $.each(data, function(i, n) {
        // console.log(n);
        if (n.done) {
            $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + n.title + "</p><a href='javascript:;' id = " + i + "></a></li>");
            donecount++;
        } else {
            $("ol").prepend("<li><input type='checkbox'><p>" + n.title + "</p><a href='javascript:;' id = " + i + "></a></li>");
            todocount++;
        }
    })
    $("#donecount").text(donecount);
    $("#todocount").text(todocount);
}