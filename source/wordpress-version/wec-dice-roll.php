<?php 
/*
 * Plugin Name: D6 die roll
 * Description: CSS and JavaScript D6 die roll widget for Wordpress
 * Author: Thomas Groubet
 * Author URI: https://www.webencharteuse.fr
 * License: GPL v2 or later
 * Version: 1.0.0
 * Text Domain: wec-dice-roll
 */

 if ( !defined('ABSPATH') )
 {
    exit;
 }

 class WECDiceRoll {

    public function __construct()
    {
        // Create custom post type
        add_action( 'admin_menu', array($this, 'create_admin_menu'));

        // add asset (js, css, etc)
        add_action('wp_enqueue_scripts', array($this, 'load_assets'));

        // add shortcode
        add_shortcode( 'wec-dice-roll', array($this, 'load_shortcode'));

        // Load Javascript
        add_action( 'wp_footer', array($this, 'load_scripts'));
    }

    // Create Plugin Menu in Back End
    public function create_admin_menu()
    {
        add_menu_page (
            'WEC Roll The Dice!', // page title
            'WEC Dice Roll', // menu title
            'manage_options',
            plugin_dir_path(__FILE__) . 'admin/view.php', //url to admin page
            null,
            'dashicons-games',
        );
    }

    // Load CSS, JS and more
    public function load_assets()
    {
        // add CSS
        wp_enqueue_style( 
            'wec-dice-roll',
            plugin_dir_url( __FILE__ ) . 'css/wec-dice-roll.css',
            array(),
            '1.0.0',
            'all'
        );

        // add JS
        wp_enqueue_script(
            'wec-dice-roll',
            plugin_dir_url( __FILE__ ) . 'js/wec-dice-roll.js',
            array(),
            '1.0.0',
            true
        );        
    }

    // Load Shortcode on Front End
    public function load_shortcode()
    {
        return '<div id="wec-dice-roll-container" style="text-align:center;"></div>';

    }

    // Load Javascript in Footer
    public function load_scripts()
    {?>
        <!--- My Code in HTML -->
        <script></script>

    <?php }

 }

 new WECDiceRoll;
