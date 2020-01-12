/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 */

import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import WeekView, { addLocale } from 'react-native-week-view';
import { Text, TouchableOpacity } from 'react-native';

addLocale('fr', {
	months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
		'_'
	),
	monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split(
		'_'
	),
	weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
});

export default class App extends Component {
	selectedDate = new Date();

	generateDates = (hours, minutes) => {
		const date = new Date();
		date.setHours(date.getHours() + hours);
		if (minutes != null) {
			date.setMinutes(minutes);
		}
		return date;
	};
	onPress = event => {
		Alert.alert('eventId:' + event.id);
	};

	renderEvent = (event, style) => {
		return (
			<TouchableOpacity
				key={event.id}
				onPress={() => this.onPress(event)}
				style={[
					styles.item,
					style,
					{
						backgroundColor: event.color,
					},
				]}
			>
				<Text style={styles.description}>{event.description}</Text>
			</TouchableOpacity>
		);
	};

	render() {
		const events = [
			{
				id: 1,
				description: 'Event 1',
				startDate: this.generateDates(0),
				endDate: this.generateDates(2),
				color: 'blue',
			},
			{
				id: 2,
				description: 'Event 2',
				startDate: this.generateDates(1),
				endDate: this.generateDates(4),
				color: 'red',
			},
			{
				id: 3,
				description: 'Event 3',
				startDate: this.generateDates(-5),
				endDate: this.generateDates(-3),
				color: 'green',
			},
		];

		return (
			<View style={styles.container}>
				<WeekView
					events={events}
					selectedDate={this.selectedDate}
					numberOfDays={3}
					onEventPress={event => Alert.alert('eventId:' + event.id)}
					headerStyle={styles.headerStyle}
					formatDateHeader="MMM D"
					//locale="fr"
					renderEvent={this.renderEvent}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
		paddingTop: 22,
	},
	headerStyle: {
		backgroundColor: '#4286f4',
	},
	item: {
		alignItems: 'center',
		position: 'absolute',
		paddingVertical: 8,
		paddingHorizontal: 2,
		borderRadius: 5,
		flex: 1,
	},
	description: {
		color: '#fff',
		textAlign: 'left',
		fontSize: 14,
		fontWeight: 'bold',
		fontFamily: 'SFProDisplay-Bold',
		padding: 5,
	},
});
