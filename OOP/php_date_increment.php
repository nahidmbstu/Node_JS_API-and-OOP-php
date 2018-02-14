<?php

   



    $todaySdate= date("Y-m-01 " );

  $todayEdate= date("Y-m-01 23:59:59 ");



   for ($i=1; $i<=30 ; $i++) 



   {

    

	$this->db->select('*'); 

	$this->db->from('ospos_sales AS A');

	$this->db->join('ospos_sales_payments AS B', 'B.sale_id = A.sale_id', 'left');  

	$this->db->where('A.sale_time >=', $todaySdate);

	$this->db->where('A.sale_time <=', $todayEdate);

	$Todaysales = $this->db->get()->result_array();      

	

	$todaySale=0;

	 foreach($Todaysales as $d)



	 {

              

         $data[] = [ 'cols' => $d['sale_time'], 'rows' => $d['payment_amount']];





	 	 

	 	 $todaySale+=$d['payment_amount'];





	 }



     echo $todaySdate.'TK  :' .number_format( $todaySale,"2" )."</br>";



     $todaySdate= date('Y-m-d', strtotime("$todaySdate +1 day"));

     $todayEdate= date('Y-m-d 23:59:59', strtotime("$todayEdate +1 day")); 





     }

     

     var_dump($data);



     $encoded_data = json_encode($data);







?>

