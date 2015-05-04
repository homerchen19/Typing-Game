
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="js/kickstart.js"></script>    <!-- KICKSTART -->
	<link rel="stylesheet" href="css/kickstart.css" media="all" />    <!-- KICKSTART -->
	<style>
		body{
    	font-family: "微軟正黑體" , Arial , serif;
		}
	</style>
  </head>	
  <body bgcolor="lightblue">
    <table border="0" align="center"  cellspacing="0"> 
		<thead>
			<tr>
				<th width="20%">名稱</th>
				<th width="60%">分數</th>
			</tr>
		</thead>		
			<?php
			$host="140.116.245.148";//please modify as "140.116.245.148" when you upload
			$user="f74012308";//your student id.
			$pw="answer381";//your pw.
			$db="f74012308";//your student id.
			
			$link=mysql_connect($host,$user,$pw) or die ("Unable to connect!");
			mysql_select_db($db) or die ("Unable to select database!");
			$result=mysql_query("SELECT * FROM `rank2` ORDER BY `score` DESC LIMIT 0,15", $link);
			$total_records = mysql_num_rows($result);
			$row = @mysql_fetch_row($result);				
			for ($i = 0; $i < $total_records; $i++)//列出所有資料
			{
				$row = mysql_fetch_assoc($result);//取得會員資料
									
				//顯示會員各欄位的資料
				echo "<tr align='center' bgcolor='#EDEAB1'>";
				echo "<td>" . $row["name"] . "</td>";			
				echo "<td>" . $row["score"] . "</td>";
				echo "</tr>";
				echo "</form>";
			}
			mysql_free_result($result);														
			?>
    </table>
  </body>                                                                                 
</html>