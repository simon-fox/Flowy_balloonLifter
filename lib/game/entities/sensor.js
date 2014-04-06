ig.module( 
	'game.entities.sensor'
)
.requires(
	'impact.entity',	
	'plugins.box2d.entity'
)
.defines(function(){


EntitySensor = ig.Box2DEntity.extend({
	size: {x: 145, y:15},
	type: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER, // Collision is already handled by Box2D!
	state: 'OFF',
	name: 'SENSOR',
	radius: 90,	
	senseFor: 'RED',

	init: function( x, y , settings ) {

		this.parent( x, y, settings );


		switch( ig.game.getEntitiesByType(EntitySensor).length ){
			case 0:
				this.fillColor = "rgba(245, 56, 75, 0.7)";
			break;
			case 1:
				this.fillColor = "rgba(195, 140, 209, 0.7)";
			break;
		}


	},
	
	createBody: function() {
		var bodyDef = new Box2D.Dynamics.b2BodyDef();
		bodyDef.position = new Box2D.Common.Math.b2Vec2(
			(this.pos.x ) * Box2D.SCALE,
			(this.pos.y ) * Box2D.SCALE
		); 
		bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
		this.body = ig.world.CreateBody(bodyDef);

		var fixture = new Box2D.Dynamics.b2FixtureDef;
		fixture.density = 0.0001;
		fixture.shape = new Box2D.Collision.Shapes.b2PolygonShape();
		fixture.shape.SetAsBox(
			this.size.x / 2 * Box2D.SCALE,
			this.size.y / 2  * Box2D.SCALE
		);

		fixture.isSensor = true;
		fixture.userData = this;

		this.fixture = this.body.CreateFixture(fixture);
	},
	
	update: function() {		
        this.parent();

	},

	draw: function() {
        this.parent();

		//grab the canvas
        var ctx = ig.system.context;

		//draw rectangle
 		ctx.fillStyle = this.fillColor;
		ctx.fillRect( this.pos.x , this.pos.y , this.size.x , this.size.y );
		ctx.save();
        ctx.restore();

	}
});
	
});