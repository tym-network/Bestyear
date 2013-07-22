<?php

namespace Bestyear\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MainController extends Controller
{
    public function indexAction()
    {
        return $this->render('BestyearMainBundle:Main:index.html.twig', array());
    }
    
    public function userAction()
    {
        return $this->render('BestyearMainBundle:Main:userView.html.twig', array());
    }
    
    public function listUsersAction()
    {
        return $this->render('BestyearMainBundle:Main:listUsers.html.twig', array());
    }
}
