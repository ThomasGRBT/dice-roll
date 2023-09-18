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

 class SimpleContactForm {

    public function __construct()
    {
        // Create custom post type
        add_action('init', array($this, 'create_custom_post_type'));

        // add asset (js, css, etc)
        add_action('wp_enqueue_scripts', array($this, 'load_assets'));

        // add shortcode
        add_shortcode( 'wec-dice-roll', array($this, 'load_shortcode'));

        // Load Javascript
        add_action( 'wp_footer', array($this, 'load_scripts'));
    }

    // Create Plugin Menu in Back End
    public function create_custom_post_type()
    {
        $myVariables = array(

                'public' => true,
                'has_archive' => true,
                'supports' => array('title'),
                'exclude_from_search' => true,
                'public_queryable' => false,
                'capability' => 'manage_otpions',
                'labels' => array(
                    'name' => 'WEC - Roll The Dice!',
                    'singular_name' => 'WEC Roll The Dice'
                ),
                'menu-icon' => 'dashicons-games',
            );

            register_post_type('wec_dice_roll', $myVariables);
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

 new SimpleContactForm;