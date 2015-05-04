<?php
header("Content-Type:text/html; charset=utf-8");
$name = $_GET["name"];
$score = $_GET["score"];
$host="140.116.245.148";//please modify as "140.116.245.148" when you upload
$user="f74012308";//your student id.
$pw="answer381";//your pw.
$db="f74012308";//your student id.
$link=mysql_connect($host,$user,$pw) or die ("Unable to connect!");
mysql_select_db($db) or die ("Unable to select database!");
$result=mysql_query("SELECT * FROM `rank2` WHERE name='$name' ",$link);
$row = @mysql_fetch_row($result);
if(mysql_num_rows($result)!=NULL) //看該編號是否填過了
	{
		mysql_free_result($result);
		echo "<script type='text/javascript'>";
		echo "alert('這個編號已經用過囉 請嘗試其他編號');";
		echo "history.back();";
		echo "</script>";
	}
	else 
	{
		mysql_free_result($result);
		$result=mysql_query("INSERT INTO `rank2` ( `name` ,`score`) 
			VALUES ('$name', '$score')",$link);
		mysql_free_result($result);
		$result=mysql_query("SELECT * FROM `rank2` ORDER BY `score` DESC");
		echo "<script type='text/javascript'>";
		echo "alert('新增成功');";
		echo "history.back();";
		echo "location.replace('RANK.html');";
		echo "</script>";
	}
?>