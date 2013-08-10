<?php

namespace Bestyear\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response as Reponse;
use Symfony\Component\HttpFoundation\Request;

class MainController extends Controller
{
    public function indexAction()
    {
        if ($this->get('security.context')->isGranted('ROLE_USER')) {
            $now = date_create();
            $em = $this->getDoctrine()->getManager();
            
            // Users which birthday is today
            $query = $em->createQuery(
                "SELECT u 
                FROM BestyearUserBundle:User u 
                WHERE DATE_FORMAT(u.birthdate, '%m%d') = DATE_FORMAT(:now, '%m%d')"
            )->setParameter('now', $now);
            
            $birthdayUsers = $query->getResult();
            
            // Users which birthday is coming in 4 days
            $query = $em->createQuery(
                "SELECT u 
                FROM BestyearUserBundle:User u 
                WHERE DATE_FORMAT(u.birthdate, '%m%d') between DATE_FORMAT(DATE_ADD(:now, 1, 'day'), '%m%d') and date_format(DATE_ADD(:now, 4, 'day'), '%m%d')"
            )->setParameter('now', $now);
            
            $incomingBirthdayUsers = $query->getResult();
            
            return $this->render('BestyearMainBundle:Main:indexLogged.html.twig', array('todaysBirthday' => $birthdayUsers, 'incomingBirthdayUsers' => $incomingBirthdayUsers));
        } else {
            return $this->render('BestyearMainBundle:Main:indexNotLogged.html.twig', array());
        }
    }
    
    public function searchUsersAction(Request $request)
    {
        if ($this->get('security.context')->isGranted('ROLE_USER')) {
            $em = $this->getDoctrine()->getManager();
            $users = $em->getRepository('BestyearUserBundle:User')->findAll();
            $data = array();
            
            $nowShort = date('md');
            $nowYear = date('Y');
            
            $response = new Reponse();
            $response->headers->set('Content-Type', 'text/javascript');
            
            foreach ($users as $user) {
                $bdateShort = $user->getBirthdate()->format('md');
                $bdateYear = $user->getBirthdate()->format('Y');
                $age = $bdateShort > $nowShort ? ($nowYear - $bdateYear - 1) : ($nowYear - $bdateYear);
                $data[] = array(
                 "fullname" => $user->getGivenname() . " " . $user->getFamilyName(),
                 "studies" => $user->getTC() . $user->getStudylevel(),
                 "age" => $age
                 );
            }

            $json = json_encode($data);
            $page = "var json = " . $json;
            $page .= "\n" . $request->query->get('callback') . '(json)';
            
            $response->setContent($page);

            return $response;
        } else {
            return $this->indexAction();
        }
    }
}
