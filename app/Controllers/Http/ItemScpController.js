'use strict'

const Helpers = use('Helpers');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const ItemScp = use('App/Models/itemScp');
/**
 * Resourceful controller for interacting with itemscps
 */
class ItemScpController {
  /**
   * Show a list of all itemscps.
   * GET itemscps
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    const spcs = await ItemScp.all()
    return response.json(spcs)
  }



  /**
   * Create/save a new itemscp.
   * POST itemscps
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth,request, response }) {
    const user = await auth.getUser();
    const scp = request.all();
    const newSpcs = new ItemScp();
    const avatar = request.file('avatar',{
        types:['image'],
        size:'2mb'
    })
    
    newSpcs.name        = scp.name
    newSpcs.item        = scp.item
    newSpcs.descrition = scp.descrition 
    newSpcs.category_id = scp.category_id
    newSpcs.user_id     = user.id
    newSpcs.url_img = new Date().getTime()+"."+avatar.subtype;
    await avatar.move(Helpers.publicPath('uploads'),{
      name: newSpcs.url_img
    })
    if(!avatar.moved()){
      return "ocurrio un error";
    }

    await newSpcs.save()
    //const cssFile = Helpers.tmpPath('/public/upload/scp/'+newSpcs.url_img)
    
    return response.json(newSpcs)
  }



  /**
   * Update itemscp details.
   * PUT or PATCH itemscps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a itemscp with id.
   * DELETE itemscps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
  }
}

module.exports = ItemScpController
