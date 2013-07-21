<?php

namespace Bestyear\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MainController extends Controller
{
    public function indexAction()
    {
        return $this->render('BestyearMainBundle:Main:index.html.twig', array());
    }
}
