class homepage
{
    constructor(page)
    {
        this.page = page;
    }

    async gotohomepage()
    {
        await this.page.goto('https://www.agarbattikart.com/')
    }


    }


module.exports = homepage;