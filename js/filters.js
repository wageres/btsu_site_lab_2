const bikes = [
	{
		title: "Велосипед Skif 26 Disc (2021) горный рам.:17",
		type: "Горный",
		brand: "Skif",
		price: 14990,
		img: "https://cdn.sptmr.ru/upload/resize_cache/iblock/a8c/370_416_1/44796240299.jpg"
	},
	{
		title: "Велосипед Stels Focus V 26 18-sp (V030) горный",
		type: "Горный",
		brand: "Stels",
		price: 17940,
		img: "https://cdn.sptmr.ru/upload/resize_cache/iblock/64a/331_394_1/20072830299.jpg"
	},
	{
		title: "Велосипед Stark Madness 4 BMX",
		type: "BMX",
		brand: "Stark",
		price: 22800,
		img: "https://cdn.sptmr.ru/upload/resize_cache/iblock/6e9/331_394_1/42259460299.jpg"
	},
	{
		title: "Велосипед BMX Stern Shaman 20",
		type: "BMX",
		brand: "Stern",
		price: 16999 ,
		img: "https://cdn.sptmr.ru/upload/resize_cache/iblock/d09/370_416_1/41059070299.jpg"
	},
	{
		title: "Велосипед BMX KHE Strikedown Pro",
		type: "BMX",
		brand: "KHE",
		price: 55499,
		img: "https://cdn.sptmr.ru/upload/resize_cache/iblock/dda/370_416_1/33116220299.jpg"
	},
	{
		title: "Велосипед BMX KHE Strikedown Pro",
		type: "BMX",
		brand: "KHE",
		price: 55499,
		img: "https://cdn.sptmr.ru/upload/resize_cache/iblock/dda/370_416_1/33116220299.jpg"
	},
	{
		title: "Велосипед Novatrack Katrina городской",
		type: "Городской",
		brand: "Katrina",
		price: 19740,
		img: "https://cdn.sptmr.ru/upload/resize_cache/iblock/6e9/331_394_1/42259460299.jpg"
	},
	{
		title: "Велосипед Forward Valencia 24 1.0",
		type: "Городской",
		brand: "Forward",
		price: 10910,
		img: "https://cdn.sptmr.ru/upload/resize_cache/iblock/afc/331_394_1/31253820299.jpg"
	},
	{
		title: "Велосипед Stels XT280",
		type: "Шоссейный",
		brand: "Stels",
		price: 38300,
		img: "https://cdn.sptmr.ru/upload/resize_cache/iblock/de8/331_394_1/30595840299.jpg"
	},
	{
		title: "Велосипед Giant Contend 2 шоссейный",
		type: "Шоссейный",
		brand: "GIANT",
		price: 72500,
		img: "https://cdn.sptmr.ru/upload/resize_cache/iblock/e39/331_394_1/42357770299.jpg"
	},
	{
		title: "Велосипед Giant ATX 27.5 горный",
		type: "Горный",
		brand: "GIANT",
		price: 47300,
		img: "https://cdn.sptmr.ru/upload/resize_cache/iblock/7e4/331_394_1/42958620299.jpg"
	},
	{
		title: "Велосипед Stels Aggressor MD",
		type: "Фэтбайк",
		brand: "Stels",
		price: 27320,
		img: "https://cdn.sptmr.ru/upload/resize_cache/iblock/955/370_416_1/42693150299.jpg"
	},

];

const filters = {
	type: "Тип",
	brand: "Бренд",
	price: "Цена",
};


class BikesList 
{
	constructor(bikes, filters)
	{
		this.bikes = bikes;
		this.filters = filters;
		this.filtrBikes = this.bikes.slice();
		this.min_price = null;
		this.max_price = null;

		this.current_min_price = null;
		this.current_max_price = null;


	}

	ShowFilters(selector) 
	{
		const startTemplate = '<div class="filter__title">{{name}}</div>';
		const midleTemplate = '<div class="filter"><input type="checkbox" name="{{prop}}"" value="{{name}}">{{name}}</div>';
		const midleDisTemplate = '<div class="filter"><input type="checkbox" name="{{prop}}"" value="{{name}}">{{name}}</div>';


		const PriceTemplate = '<div class="filter"><input value="{{min}}" class="min-price" type="text">-<input value="{{max}}" class="max-price" type="text"></div>';
		const ResetTemplate = '<div class="button-res"><button class="button-reset">Сбросить</button></div>'
		let output = '';

		for(let prop in this.filters)
		{
			let tmpLine = '';
			if(prop == "price")
			{
				this.ChangePrice();
				this.current_min_price = this.min_price;
				this.current_max_price = this.max_price;

				//console.log(this.current_min_price);
				//console.log(this.current_max_price);


				tmpLine += startTemplate.replace('{{name}}',this.filters[prop]);
				tmpLine += PriceTemplate.replace('{{min}}',this.min_price).replace('{{max}}',this.max_price);
			}
			else
			{
				tmpLine += startTemplate.replace('{{name}}',this.filters[prop]);
				let vals = [];
				for(let bike of this.bikes)
				{
					if(!vals.includes(bike[prop]))
					{
						vals.push(bike[prop]);
					}
				}

				vals.sort();
				vals.forEach(function(item, index, array) {
					tmpLine += midleTemplate.replace("{{prop}}", prop ).replaceAll("{{name}}",item);	
				});
			}
			output += tmpLine;
		}
		output += ResetTemplate;
		$(selector).html(output);
	}

	ChangePrice()
	{
		let prices = []; 
		for(let bike of this.filtrBikes)
		{
			prices.push(bike.price);
		}
		if(prices.length)
		{
			this.min_price = prices[0];
			this.max_price = prices[0];
			for(let price of prices)
			{
				if(price < this.min_price)
				{
					this.min_price = price;
				}
				if(price > this.max_price)
				{
					this.max_price = price;
				}
			}

			
		}
	}

	ShowBikes(selector) 
	{

		const startTemplate = '<article class="bike"><div class="bike__row"><div class="bike__photo"><img src="{{img}}"></div>'
		const midleTemplate = '<div class="bike__title">{{name}}</div><div class="bike__price">{{price}} ₽</div>'
		const endTemplate = '</div></div></article>'

		let output = '';

		for (let bike of this.filtrBikes)
		{
			let tmpLine = '';
			tmpLine += startTemplate.replace('{{img}}',bike.img);
			tmpLine += midleTemplate.replace('{{name}}',bike.title).replace('{{price}}',bike.price);
			tmpLine += endTemplate;

			output += tmpLine;
		}
		
		$(selector).html(output);
	}

	SelectFilters() 
	{
		let result = [];
		for (let prop in this.filters) 
		{
			if(prop != "price")
			{
				result.push(prop);
				let searchIDs = $(".main__filters input[name='"+prop+"']:checkbox:checked").map(function(){
					return $(this).val();
				}).get(); 
				result[prop] = searchIDs;
			}
		}
		return result;
	}


	ApplyFilters(filter) 
	{
		this.filtrBikes = [];
		for (let bike of this.bikes) 
		{
			let ok = true;
			for (let prop in this.filters) 
			{	
				if(prop != "price")
				{
					if (!filter[prop].length)
					{
						continue;
					}
					
					if (filter[prop].indexOf(bike[prop]) == -1)
					{
						ok = false;
					}
					
				}
				else
				{
					if(bike[prop] > this.current_max_price && bike[prop] < this.current_min_price)
					{
						ok = false;
					}
				}	
			}
			if (ok) 
			{
				this.filtrBikes.push(bike);
			};
		}
		/*
		this.ChangePrice();

		
		
		this.current_min_price = this.min_price;
		$('.filter .min-price')[0].value = this.current_min_price;
		
		
		this.current_max_price = this.max_price;
		$('.filter .max-price')[0].value = this.current_max_price;
		*/
		
	}

	ApplyPrice()
	{
		let tempBikes = this.filtrBikes.slice(); 
		this.filtrBikes = [];
		for(let bike of tempBikes)
		{
			if(bike["price"] <= this.current_max_price && bike["price"] >= this.current_min_price)
			{
				this.filtrBikes.push(bike);
			}
		}
	}


	ChangeFilters()
	{

		for(let prop in this.filters)
		{
			if(prop != 'price')
			{
				let checkboxes = $(".filter input[name='"+prop+"']:checkbox");
				
				for(let checkbox of checkboxes)
				{
					let disable = true;
					for(let bike of this.filtrBikes)
					{
						if(bike[prop] == checkbox.value)
						{
							disable = false;
							break;
						}
					}
					checkbox.disabled = disable;
				}

			}
		}
	}

	ResetFilters()
	{
		$(".main__filters .filter input:checkbox").removeAttr("checked");
	}

	
}



$(document).ready(function()
{
	let bk = new BikesList(bikes,filters);
	bk.ShowFilters('.main__filters');
	bk.ShowBikes('.bikes__row');

	$('.main__filters .filter input:checkbox').change(function()
	{
		let SelectedFilters = bk.SelectFilters();
		bk.ApplyFilters(SelectedFilters);
		bk.ApplyPrice();
		bk.ShowBikes('.bikes__row');
		bk.ChangeFilters();
		
	});   


	$('.filter .min-price').change(function(){
		let min = $('.filter .min-price').val();
		let SelectedFilters = bk.SelectFilters();
		bk.ApplyFilters(SelectedFilters);
		if(!isNaN(min) && min >= 0)
		{
			min = +min;
			if(bk.current_max_price == null || min <= bk.current_max_price)
			{
				bk.current_min_price = min;
			}

			else
			{
				bk.current_min_price = bk.min_price;
			}
			
		}
		else 
		{
			bk.current_min_price = bk.min_price;
		}

		$('.filter .min-price')[0].value = bk.current_min_price;
		bk.ApplyPrice();
		bk.ShowBikes('.bikes__row');
		bk.ChangeFilters();
	});

	$('.filter .max-price').change(function()
	{
		let max = $('.filter .max-price').val();
		let SelectedFilters = bk.SelectFilters();
		bk.ApplyFilters(SelectedFilters);
		if(!isNaN(max) && max >= 0)
		{
			max = +max;
			if(bk.current_min_price === null || bk.current_min_price <= max)
			{
				bk.current_max_price = max;

			}
			else
			{
				//console.log(bk.current_min_price + " " + max);
				bk.current_max_price = bk.max_price;
			}
		}
		else 
		{
			bk.current_max_price = bk.max_price;
		}
		
		$('.filter .max-price')[0].value = bk.current_max_price;
		bk.ApplyPrice();
		bk.ShowBikes('.bikes__row');
		bk.ChangeFilters();
	});

	$('.button-reset').click(function() {
		$(".main__filters .filter input:checkbox").removeAttr("checked");

		let SelectedFilters = bk.SelectFilters();
		bk.ApplyFilters(SelectedFilters);
		bk.ShowBikes('.bikes__row');
		bk.ChangeFilters();
		bk.ChangePrice();
		bk.current_min_price = bk.min_price;
		bk.current_max_price = bk.max_price;
		$('.filter .max-price').val(bk.max_price);
		$('.filter .min-price').val(bk.min_price);

	});
}); 