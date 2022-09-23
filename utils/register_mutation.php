<?php

# This is the action that is executed as the GraphQL Schema is being built.
add_action( 'graphql_register_types', function() {

	# This function registers a mutation to the Schema.
	# The first argument, in this case `exampleMutation`, is the name of the mutation in the Schema
	# The second argument is an array to configure the mutation.
	# The config array accepts 3 key/value pairs for: inputFields, outputFields and mutateAndGetPayload.
	register_graphql_mutation( 'exampleMutation', [

		# inputFields expects an array of Fields to be used for inputting values to the mutation
		'inputFields'         => [
			'exampleInput' => [
				'type' => 'String',
				'description' => __( 'Description of the input field', 'your-textdomain' ),
			]
		],

		# outputFields expects an array of fields that can be asked for in response to the mutation
		# the resolve function is optional, but can be useful if the mutateAndPayload doesn't return an array
		# with the same key(s) as the outputFields
		'outputFields'        => [
			'exampleOutput' => [
				'type' => 'String',
				'description' => __( 'Description of the output field', 'your-textdomain' ),
				'resolve' => function( $payload, $args, $context, $info ) {
                   			return isset( $payload['exampleOutput'] ) ? $payload['exampleOutput'] : null;
				}
			]
		],

		# mutateAndGetPayload expects a function, and the function gets passed the $input, $context, and $info
		# the function should return enough info for the outputFields to resolve with
		'mutateAndGetPayload' => function( $input, $context, $info ) {
			// Do any logic here to sanitize the input, check user capabilities, etc
			$exampleOutput = null;
			if ( ! empty( $input['exampleInput'] ) ) {
				$exampleOutput = 'Your input was: ' . $input['exampleInput'];
			}
			return [
				'exampleOutput' => $exampleOutput,
			];
		}
	] );

} );