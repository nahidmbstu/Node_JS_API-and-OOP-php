<?php


/**
* 
*/
class bookprice 
{
	public $price = 100;
	 
	 public function showprice()
	{
		echo 'the price is'.$this->price;
	}

	public function discount($amount)
	{
		echo 'discout price is '.$this->price=$this->price-$amount;
	}
}


$price= new bookprice();

$price->showprice();

echo "<br>";

$price->discount(40);

?>